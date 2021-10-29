import { useRecoilState } from "recoil"
import { futuresTxlistAtom } from "../state/futures"
import { blockNumberAtom } from "../state/app"
import { useEffect } from "react"
import { futuresContractAddress } from "../constant/contract"

const useFetchFuturesTxlist = (lastBlock: number = 0) => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_APIKEY
  const address = futuresContractAddress
  const api = require("etherscan-api").init(apiKey)
  const [futuresTxlist, setFuturesTxlist] = useRecoilState(futuresTxlistAtom)
  const [blockNumber] = useRecoilState(blockNumberAtom)

  useEffect(() => {
    fetchTxlist()
  }, [blockNumber])

  async function fetchTxlist() {
    const list = await api.account.txlist(address, lastBlock, "latest", 1, 100, "asc").then((res: any) => {
      return res.result
    })
    setFuturesTxlist(list)
  }
  console.log(futuresTxlist)

  return null
}

export default useFetchFuturesTxlist