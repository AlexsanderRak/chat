
const reorder = (source, destination, that) => {

    let state = { ...that.state };
    if (source.droppableId === destination.droppableId) {   // inside array ?
        let result;
        result = Array.from(state[source.droppableId]);
        const [removed] = result.splice(source.index, 1);
        result.splice(destination.index, 0, removed);
        state[source.droppableId] = result
        return { state }
    }
    else {                                                  // outside array ?
        let sourceList, destinationList, result;
        sourceList = Array.from(state[source.droppableId]);
        destinationList = Array.from(state[destination.droppableId]);
        const [removed] = sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, removed);
        state[source.droppableId] = sourceList
        state[destination.droppableId] = destinationList
        return { state, uid: removed.uid, removed_status: destination.droppableId }
    }

};

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    borderRadius: '5px',
    padding: '25px 10px 10px',
    // change background colour if dragging
    background: isDragging ? '#FFD700' : '#fff',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? '#008B8B' : '#008080',
    position: "relative",
    padding: "10px 0px",
    paddingTop: "30px",
    maxWidth: 600,
    height: '100%',
});

export { reorder, getItemStyle, getListStyle }