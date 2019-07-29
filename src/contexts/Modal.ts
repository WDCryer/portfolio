import { createContext } from "react";

interface ISetIsModalOpen {
    (isModalOpen: boolean): void;
    (callback: (isModalOpen: boolean) => boolean): void;
}

const isModalOpen: boolean = false;
const setIsModalOpen = (isModalOpen: boolean) => {};

export default createContext([isModalOpen, setIsModalOpen]);
