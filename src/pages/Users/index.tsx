import {SimpleGrid, Stack} from "@chakra-ui/react";
import Norm from "../../components/Norm";
import LineChart from "../../components/LineChart";
import {useRecoilValue} from "recoil";
import {newUsersListAtom} from "../../state/users/updateNewUsersList";
import {activeUsersListAtom} from "../../state/users/updateActiveUsersList";
import {statusAtom} from "../../hooks/useFetchFuturesTxList";
import {useEffect, useState} from "react";

const Users = () => {
  const [allUser, setAllUser] = useState("-")
  const [futuresTradingUsers, setFuturesTradingUsers] = useState("-")
  const [optionsTradingUsers, setOptionsTradingUsers] = useState("-")
  const newUsersList = useRecoilValue(newUsersListAtom({}))
  const activeUsersList = useRecoilValue(activeUsersListAtom({}))
  const status = useRecoilValue(statusAtom)

  useEffect(()=>{
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    fetch("https://api.hedge.red/api/users/totalNumber")
      .then((res) => res.json())
      .then((json) => setAllUser(Number(json["value"]).toFixed(0))
      )
    fetch("https://api.hedge.red/api/users/futuresUsersNumber")
      .then((res) => res.json())
      .then((json) => setFuturesTradingUsers(Number(json["value"]).toFixed(0))
      )
    fetch("https://api.hedge.red/api/users/optionsUsersNumber")
      .then((res) => res.json())
      .then((json) => setOptionsTradingUsers(Number(json["value"]).toFixed(0))
      )
  }

  return (
    <Stack spacing={["22px", "22px", "44px"]} p={["22px", "22px", "44px"]}>
      <SimpleGrid columns={[1, 1, 1, 3]} spacing={["22px", "22px", "44px"]}>
        <Norm value={allUser} desc={"All users"} color={"#C7A072"}/>
        <Norm value={futuresTradingUsers} desc={"Futures Trading users"} color={"#E57200"}/>
        <Norm value={optionsTradingUsers} desc={"Options Trading users"} color={"#00B388"}/>
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={["22px", "22px", "44px"]}>
        <LineChart title={"New Users"} data={newUsersList} noFixed={true}/>
        <LineChart title={"Active Users"} data={activeUsersList} noFixed={true} noTotal/>
      </SimpleGrid>
    </Stack>
  )
}

export default Users
