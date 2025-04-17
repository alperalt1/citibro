import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type DialogConfig = {
  title: string;
  icon?: 'warning' | 'success';
  html: string;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

interface GenericDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config: DialogConfig;
}

const GenericDialog: React.FC<GenericDialogProps> = ({ isOpen, onClose, config }) => {
  const {
    title,
    icon,
    html,
    showCancelButton = false,
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar',
    onConfirm,
    onCancel,
  } = config;

  const renderIcon = () => {
    switch (icon) {
      case 'warning':
        return <WarningIcon color="warning" fontSize="large" />;
      case 'success':
        return <CheckCircleIcon color="success" fontSize="large" />;
      default:
        return null;
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          {renderIcon()}
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>{html}</Typography>
      </DialogContent>
      <DialogActions>
        {showCancelButton && (
          <Button onClick={handleCancel} color="inherit">
            {cancelButtonText}
          </Button>
        )}
        <Button onClick={handleConfirm} color="primary" variant="contained">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;