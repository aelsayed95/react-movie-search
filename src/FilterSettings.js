import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from "@material-ui/core/IconButton";
import FilterList from "@material-ui/icons/FilterList";


const FilterButton = withStyles({
    root: {
      boxShadow: 'none',
      color: "white",
      backgroundColor: 'rgba(0,0,0,0.75)',
      borderColor: 'rgba(0,0,0,0.75)',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderColor: 'rgba(0,0,0,0.85)',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: 'rgba(0,0,0,0.65)',
        borderColor: 'rgba(0,0,0,0.75)',
      },
      '&:focus': {
          backgroundColor: 'rgba(0,0,0,0.85)',
          borderColor: 'rgba(0,0,0,0.85)',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      }
    },
  })(IconButton);


export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <FilterButton onClick={handleClick}>
          <FilterList />
      </FilterButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="filter-settings">Filter Settings</div>
      </Collapse>
    </>
  );
}
