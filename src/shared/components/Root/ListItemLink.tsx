import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { NavLink, LinkProps } from "react-router-dom";
import { MenuModel } from "../../../router/models/MenuModel";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(itemProps, ref) {
  return (
    <NavLink
      ref={ref}
      {...itemProps}
      role={undefined}
      style={{ color: "black", textDecoration: "none" }}
      className={({ isActive }) => (isActive ? `${itemProps.className} Mui-selected` : itemProps.className)}
    />
  );
});

interface ListItemLinkProps {
  onPressedItem?: (value: string) => void;
  item: MenuModel;
  open: boolean;
  level?: number;
}

export default function ListItemLink(props: ListItemLinkProps) {
  const { item, open, onPressedItem, level = 0 } = props;
  const [subOpen, setSubOpen] = useState(false);

  const handleClick = () => {
    if (item.tipo === "ME") {
      setSubOpen(!subOpen);
    } else if (item.tipo === "SU") {
      onPressedItem?.(item.nombre);
    }
  };

  return (
    <>
      {/* Títulos */}
      {item.tipo === "MO" && (
        <Box sx={{ pl: level * 2, my: 1 }}>
          <Typography
            variant="subtitle2"
            color='secondary'
            sx={{
              height: '10px',
              fontWeight: 'bold',
              fontSize: '14px',
              textTransform: 'uppercase',
              padding: '0 16px',
            }}
          >
            {open ? item.nombre: ''}
          </Typography>
        </Box>
      )}

      {/* Elementos interactivos (categoría y pantalla) */}
      {item.tipo !== "MO" && (
        <Box /*sx={{ pl: level * 2 }}*/>
          <ListItem sx={{ display: "block", padding: "3px 8px" }}>
            <ListItemButton
              onClick={handleClick}
              component={item.tipo === "SU" ? Link : "div"}
              to={item.tipo === "SU" ? item.ruta : undefined}
              sx={{
                borderRadius: "5px",
                height: 35,
                justifyContent: open ? "initial" : "center",
                px: 2,
              }}
            >
              {/* Icono */}
              {item.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
              )}

              {/* Texto */}
              <ListItemText
                primary={item.nombre}
                sx={{
                  opacity: open ? 1 : 0,
                  "& .MuiListItemText-primary": {
                    fontSize: "12px",
                  },
                }}
              />

              {/* Icono de Collapse */}
              {item.tipo === "ME" && open && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {subOpen ? <ExpandLess /> : <ExpandMore />}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        </Box>
      )}

      {/* Submenú */}
      {item.subMenu?.length > 0 && (
        <Collapse in={subOpen || item.tipo === "MO"} timeout="auto" unmountOnExit>
          {item.subMenu.map((subItem, index) => (
            <ListItemLink
              key={`${subItem.key}-${index}`}
              item={subItem}
              open={open}
              onPressedItem={onPressedItem}
              level={level + 1}
            />
          ))}
        </Collapse>
      )}
    </>
  );
}

