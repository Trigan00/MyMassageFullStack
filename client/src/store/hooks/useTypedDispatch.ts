import { useDispatch } from "react-redux";
import { AppDispatch } from "..";

export const useTypedDispatch: () => AppDispatch = useDispatch;
