import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import styles from './Chess.module.css';
import * as Piece from './piece';

const PromotionModal = ({ open, color, onClick }) => (
  <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
    <DialogTitle>어떤 말로 승진하시겠습니까?</DialogTitle>
    <List>
      <ListItem button onClick={() => onClick('queen')}>
        <ListItemAvatar>
          <Avatar
            classes={{
              colorDefault: color ? styles.avatarBlack : styles.avatarWhite
            }}
          >
            {new Piece.Queen().toString()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="퀸" />
      </ListItem>

      <ListItem button onClick={() => onClick('rook')}>
        <ListItemAvatar>
          <Avatar
            classes={{
              colorDefault: color ? styles.avatarBlack : styles.avatarWhite
            }}
          >
            {new Piece.Rook().toString()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="룩" />
      </ListItem>

      <ListItem button onClick={() => onClick('bishop')}>
        <ListItemAvatar>
          <Avatar
            classes={{
              colorDefault: color ? styles.avatarBlack : styles.avatarWhite
            }}
          >
            {new Piece.Bishop().toString()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="비숍" />
      </ListItem>

      <ListItem button onClick={() => onClick('knight')}>
        <ListItemAvatar>
          <Avatar
            classes={{
              colorDefault: color ? styles.avatarBlack : styles.avatarWhite
            }}
          >
            {new Piece.Knight().toString()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="나이트" />
      </ListItem>
    </List>
  </Dialog>
);

PromotionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  color: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PromotionModal;
