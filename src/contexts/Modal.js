import { createContext } from "react";

const isModalOpen = false;
const setIsModalOpen = () => {};

export default createContext([isModalOpen, setIsModalOpen]);
