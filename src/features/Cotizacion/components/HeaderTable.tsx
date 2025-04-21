import { Space } from "antd";
import { ReactNode } from "react";

export interface HeaderProps {
  download?: boolean,
  showSelect?: boolean,
  setShowSelectFunc?: React.Dispatch<React.SetStateAction<boolean>>;
  modalAdd?: boolean
  setModelAddFunc?: React.Dispatch<React.SetStateAction<boolean>>;
  direction?: 'flex-end' | 'flex-start';
  gap?: number;
  espacio?: number;
  children: ReactNode;
}
export const HeaderTable = ({ children, direction, gap }: HeaderProps) => {
  return (
    <Space style={{ display: 'flex', flexDirection: 'row', justifyContent: direction, gap: gap }}>
      {children}
    </Space>
  );
};