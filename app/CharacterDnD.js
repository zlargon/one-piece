import { findDOMNode } from 'react-dom';

const source = {
  beginDrag(props) {
    return {
      id: props.character.id,
      index: props.index,
      isMobileDevice: props.isMobileDevice
    };
  }
};

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const isMobileDevice = props.isMobileDevice;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const itemHeight = hoverBoundingRect.bottom - hoverBoundingRect.top;

    // Determine hover distance
    // The behavior between mobile and desktop devices is different
    const hoverDistance = isMobileDevice ? 0 : itemHeight / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 'hoverDistance'
    // When dragging upwards, only move when the cursor is above 'hoverDistance'

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverDistance) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY - itemHeight > hoverDistance) {
      return;
    }

    // Time to actually perform the action
    props.onMove(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

export default { source, target };
