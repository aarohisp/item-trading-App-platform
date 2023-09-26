import { Dispatch } from "redux";

type DispatchType = (args: (args: Dispatch) => void) => void;

export default DispatchType;
