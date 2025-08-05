import { useMemo, useState, useEffect } from 'react';
import { useVisContext } from '../contexts/VisProvider';
import { hGetItems } from '../helpers/functions'
import SendDataToFileCsv from './SendDataToFileCsv';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GiPirateGrave } from "react-icons/gi";

const VisEventItemsTbl = () => {
  const { tlItem, tlItemLength } = useVisContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    let ma = tlItemLength
    const isNotEmpty = Object.keys(tlItem).length > 0;
    if (isNotEmpty) {
      getDataTimeline()
    }
    // console.log('---------------------tlItemLength',tlItemLength)
  }, [tlItemLength]);

  const columns = useMemo(
    () => [
      // {
      //   accessorKey: 'id',
      //   header: 'Id',
      //   enableEditing: false,
      //   size: 80,
      // },
      {
        accessorKey: 'content', //simple recommended way to define a column
        // id: 'content',
        header: 'content',
        muiTableHeadCellProps: { sx: { color: '#1976d2' } },
        // Cell: ({ cell }) => <span>{cell.getValue()}</span>,
        // enableHiding: false,
      },
      {
        accessorFn: (row) => row.type, //alternate way
        // id: 'type',
        header: 'type',
        muiTableHeadCellProps: { sx: { color: '#1976d2' } },
      },
      {
        // accessorFn: (row) => row.start, //alternate way
        // accessorFn: (originalRow) => new Date(originalRow.arrivalTime),
        accessorFn: (row) => new Date(row.start),
        // id: 'start', 
        header: 'start',
        muiTableHeadCellProps: { sx: { color: '#1976d2' } },
        filterVariant: 'date',
        // filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue().toLocaleDateString(),
      },
      {
        accessorFn: (row) => new Date(row.end),
        // id: 'end',
        header: 'end',
        muiTableHeadCellProps: { sx: { color: '#1976d2' } },
        filterVariant: 'date',
        Cell: ({ cell }) => cell.getValue() == 'Invalid Date' ? null : cell.getValue().toLocaleDateString(),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    getRowId: (row) => row.id,
    renderTopToolbarCustomActions: ({ table }) => (
      <SendDataToFileCsv timelineItems={tlItem} />
    ),
    // ------------
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteItem(row)}>
            <GiPirateGrave />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    // ------------
    enableExpandAll: false,
    // enableExpanding: true,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    renderDetailPanel: ({ row }) =>
    (
      <Box
        sx={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
        }}
      >
        <Typography>id:{row.original.id} </Typography>
      </Box>
    ),
    // muiExpandButtonProps: ({ row }) => ({
    //   children: row.getIsExpanded() ? <GiReturnArrow /> : <GiWideArrowDunk />,
    // }),
    // muiDetailPanelProps: ({ row }) => ({
    //   sx: {
    //     //...
    //   },
    // }),
    // muiTableBodyRowProps: ({ isDetailPanel, row }) => ({
    //   sx: {
    //     // isDetailPanel ? ... : ...
    //   },
    // }),
    // ------------
    // enableColumnOrdering: true, //enable some features
    // enableRowSelection: false,
    // enablePagination: false, //disable a default feature
    // enableGlobalFilter: false,
    // onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
    // state: { rowSelection }, //manage your own state, pass it back to the table (optional)
  });

  const getDataTimeline = () => {
    if (tlItemLength) {
      var datann = tlItem.get({ type: { start: 'ISODate', end: 'ISODate' } });
      setData(hGetItems(datann))
    }
  };

  const deleteItem = (row) => {
    tlItem.remove(row.original.id)
    getDataTimeline()
  };

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};


export default VisEventItemsTbl
