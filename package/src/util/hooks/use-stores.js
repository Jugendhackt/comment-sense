import {useContext} from "react";
import {storesContext} from "../contexts";

export const useStores = () => useContext(storesContext);
export default useStores;