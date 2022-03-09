import {createSlice } from '@reduxjs/toolkit'


let listId = 3;
let _id = 10;

  export const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        lists: [
            {
                title: "IN PROGRESS",
                listId: 0,
                cards: [
                    {
                        listId: 0,
                        id: `card-${0}`,
                        text: "class "
                    },
                    {
                        listId: 0,
                        id: `card-${1}`,
                        text: "created static 2"
                    },
                    {
                        listId: 0,
                        id: `card-${2}`,
                        text: "created static 3"
                    },
                ]
            },
            {
                title: "TO DO",
                listId: 1,
                cards: [
                    {
                        listId: 1,
                        id: `card-${3}`,
                        text: "created static 1"
                    },
                    {
                        listId: 1,
                        id: `card-${4}`,
                        text: "created static 2"
                    },
                    {
                        listId: 1,
                        id: `card-${5}`,
                        text: "created static 3"
                    },
                    {
                        listId: 1,
                        id: `card-${6}`,
                        text: "created static 4"
                    },
                    {
                        listId: 1,
                        id: `card-${7}`,
                        text: "created static 5"
                    }
                ]
            },
            {
                title: "TO DO2",
                listId: 2,
                cards: [
                    {
                        listId: 2,
                        id: `card-${8}`,
                        text: "created static 1"
                    },
                    {
                        listId: 2,
                        id: `card-${9}`,
                        text: "created static 2"
                    },
    
                ]
            },
        ]
    },
    reducers: {

        sort(state, action) {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload;

            if (type === "list") {
                console.log("list")
                const list = state.lists.splice(+droppableIndexStart, 1);
                state.lists.splice(+droppableIndexEnd, 0, ...list)
            }

            if (droppableIdStart !== droppableIdEnd) {
                console.log("droppableIdStart !== droppableIdEnd")
                const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = listStart.cards.splice(+droppableIndexStart, 1)
                const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
                listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== "all-lists") {
                const list = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = list.cards.splice(+droppableIndexStart, 1)
                list.cards.splice(+droppableIndexEnd, 0, ...card)
            }
        },

        addList(state, action){
            const newList = {
                title: action.payload.text,
                listId: listId,
                cards: []
            }
            listId += 1
            return { ...state, lists: [...state.lists, newList] }
        },

        addCard(state, action) {
            const newCard = {
                text: action.payload.text,
                id: `card-${_id}`,
            }
            _id += 1

            const newState = state.lists.map(list => {
                if (list.listId ===  action.payload._id) {
                    return { ...list, cards: [...list.cards, newCard] }
                }
                else return list
            })
            return { lists: newState }
        },
        
        changeCardText(state, action) {
            let copy = {...state}
            let newTextCard = copy.lists[action.payload.listId].cards.map(card => ({ ...card, 
                text: card.id === action.payload.id ? action.payload.text : card.text}))
            state.lists[action.payload.listId].cards = newTextCard
        },

        changeListTitle(state, action) {
            state.lists.map(list => ({...list, title: list === action.payload._id ? action.payload.titleText : list.title}))
        }
    },
})

export const { addList, addCard, sort, changeCardText, changeListTitle } = listsSlice.actions
export default listsSlice.reducer;

