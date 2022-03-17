import { useContext } from "react";
import { StoreContext } from "../App";

const useStore = () => {
	return useContext(StoreContext);
}

export default useStore