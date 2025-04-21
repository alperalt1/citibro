export interface HeaderProps {
  download?: boolean,
  showSelect: boolean,
  setShowSelectFunc: React.Dispatch<React.SetStateAction<boolean>>;
  modalAdd?: boolean
  setModelAddFunc: React.Dispatch<React.SetStateAction<boolean>>;
}