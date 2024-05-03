import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import textThread from '../../../../assets/text.png';
import { apiURL } from "../../../constants";

interface Props {
  id: string;
  title: string;
  image: string | null;
  date: Date;
  authorName: string;
}

const ThreadItem: React.FC<Props> = ({id, title, image, date, authorName}) => {
  let cardImage = image ? `${apiURL}/${image}` : textThread;
  const formattedDate = dayjs(date).format('DD/MM/YYYY');

  return (
    <ListItem alignItems="flex-start" component={Link} to={`/threads/${id}`} style={{ textDecoration: 'none' }}>
      <ListItemAvatar>
        <Avatar alt={title} src={cardImage} variant="square" sx={{ width: 56, height: 56 }} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.primary">
            By {authorName} on {formattedDate}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ThreadItem;
