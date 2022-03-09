import React from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from "styled-components"
import Grid from '@mui/material/Grid';
import FormDialog from "../dialogs/dialogs"

import "./trelloCard.scss"

const CardContainer = styled.div`
  margin-bottom: 8px;
`

const TrelloCard = ({ text, id, index, listId }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Grid>
              <CardContent className="card__content">
                <Typography>
                    <span className="card__text-wrapp">{text}</span>
                </Typography>
                <FormDialog
                  key={id}
                  text={text}
                  id={id}
                  index={index}
                  listId={listId}
                />
              </CardContent>
            </Grid>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};



export default TrelloCard;

