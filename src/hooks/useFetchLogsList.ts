import {atom, useRecoilState} from "recoil";
import fetcher from "../utils/fetcher";
import {api, env} from "../constant/etherscan";
import {useEffect} from "react";
import {futuresContractAddress} from "../constant/contract";

const apiKey = process.env.REACT_APP_ETHERSCAN_APIKEY || process.env.REACT_APP_ETHERSCAN_APIKEY

export const logsListAtom = atom({
  key: "fetch-logsListAtom::status",
  default: [],
})

const useFetchLogsList = () => {
  const [logsList, setLogsList] = useRecoilState(logsListAtom)
  const address = ( env === "mainnet" ) ?  futuresContractAddress["mainnet"] : futuresContractAddress["rinkeby"]
  const topic = "0x639a1e51b7d1ed316ba35664da82f6aac6dbb251b8968388c15951df975f9c93"
  useEffect(() => {
    fetchAllTx()
  },[])

  async function fetchTxList(startblock = "0",
                             endblock = "latest") {
    const res = await fetcher(api + "api?module=logs&action=getLogs&fromBlock=" + startblock
      + "&toBlock=" + endblock
      + "&address=" + address
      + "&topic0=" + topic
      + "&apiKey=" + apiKey)
    return res.result
  }

  async function fetchAllTx() {
    let blockHigh = 0
    let res: never[] = []

    while(res.length % 1000 === 0 ){
      let request
      request = await fetchTxList(String(blockHigh), "latest")
      blockHigh = request[request.length - 1].blockNumber
      res = res.concat(request)
    }
    setLogsList(res)
  }
}

export default useFetchLogsList