import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import { Button, Dropdown, DropdownButton, Form as BSForm, Pagination, Table as BSTable } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSortAlphaDown, faSortAlphaUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss'
import { SortByObjField } from '../../utils/sort';

const TablePagination = ({ paginationItems, setActivePage, activePage, itemsPerPage, handleChangeItemsPerPage }) => {
    const handlePrev = () => activePage > 1 ? setActivePage(activePage - 1) : setActivePage(1);
    const handleNext = () => activePage < paginationItems.length ? setActivePage(activePage + 1) : setActivePage(paginationItems.length);
    const handleFirst = () => setActivePage(1);
    const handleLast = () => setActivePage(paginationItems.length);
    const itemsPerPageArr = [5, 10, 20];

    return (
        <div className="w-100 d-flex justify-content-between">
            <span>{`Page ${activePage} of ${paginationItems.length}`}</span>
            <div className="d-flex">
                <DropdownButton className='mr-3' id="dropdown-basic-button" title={`Show ${itemsPerPage} data`}>
                    {
                        itemsPerPageArr.map((val, i) => (
                            <Dropdown.Item key={i} onClick={() => handleChangeItemsPerPage(val)}>{val}</Dropdown.Item>
                        ))
                    }
                </DropdownButton>
                <Pagination size='md'>
                    <Pagination.First disabled={activePage === 1} onClick={handleFirst} />
                    <Pagination.Prev disabled={activePage === 1} onClick={handlePrev} />
                    {
                        paginationItems.map(pg => (
                            <Pagination.Item key={pg.key} active={pg.active} onClick={() => setActivePage(pg.key)}>{pg.key}</Pagination.Item>
                        ))
                    }
                    <Pagination.Next disabled={activePage === paginationItems.length} onClick={handleNext} />
                    <Pagination.Last disabled={activePage === paginationItems.length} onClick={handleLast} />
                </Pagination>

            </div>
        </div>

    )
}

const TableHead = ({ column, handleHeaderClick, isAscending }) => {
    return (
        <th key={column.field} onClick={() => handleHeaderClick(column.field, column.sortable, column.isNumber)}>
            {column.label}
            <span className="sort ml-1">
                {
                    column.sortable ?
                        (
                            isAscending ? (
                                <FontAwesomeIcon icon={faSortAlphaDown} />
                            ) : (
                                <FontAwesomeIcon icon={faSortAlphaUp} />
                            )
                        ) : null

                }
            </span>
        </th>
    )
}

const TableRow = ({ data, handleEditButton, handleDeleteButton }) => {
    return (
        <tr key={data.id} className='tbl-row'>
            <td className="align-middle"><span className="action text-primary" onClick={() => handleEditButton(data)}>{data.username}</span></td>
            <td className="align-middle">{data.email}</td>
            <td className="align-middle text-right">{data.score}</td>
            <td className="align-middle">{data.registered}</td>
            <td className="action">
                <Button variant="link" onClick={() => handleDeleteButton(data)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </td>
        </tr>
    )
}

const Table = ({ columns, data, editAction, deleteAction }) => {

    const [displayedData, setDisplayedData] = useState([]);
    const [displayedColumns, setDisplayedColumns] = useState([])
    const [isAscending, setIsAscending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const [pageItems, setPageItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        setDisplayedColumns(columns);
        const pages = [];
        for (let index = 1; index <= Math.ceil(data.length / itemsPerPage); index++) {
            pages.push({
                key: index,
                active: index === activePage
            });
        }

        setPageItems(pages);
        getPageData(data);

        return () => data
    }, [isAscending, data, activePage, itemsPerPage])

    const handleEditButton = (data) => editAction(data);
    const handleDeleteButton = (data) => deleteAction(data);

    const handleHeaderClick = (field, sortable, isNumber) => {
        if (sortable) {
            setIsAscending(!isAscending);
            sortByfield(field, isNumber);
        }
    };

    const getPageData = (data) => {
        const start = (activePage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = [...data].slice(start, end);
        setDisplayedData(pageData);
    }

    const handleChangeItemsPerPage = (val) => {
        setActivePage(1);
        setItemsPerPage(val);
    }

    const sortByfield = (field, isNumber) => {
        const sortedData = SortByObjField(data, isAscending, field, isNumber);

        getPageData(sortedData);
    }

    return (
        <Fragment>
            <BSTable responsive bordered hover size="sm">
                <thead>
                    <tr>
                        {
                            displayedColumns.map((c, i) => (
                                <TableHead key={i} column={c} handleHeaderClick={handleHeaderClick} isAscending={isAscending} />
                            ))
                        }
                    </tr>

                </thead>
                <tbody>
                    {
                        !displayedData?.length ? (
                            <tr>
                                <td colSpan={displayedColumns.length} className="text-center">No Data</td>
                            </tr>
                        ) : (
                            displayedData.map((d, i) => (
                                <TableRow key={d.id} data={d} handleDeleteButton={handleDeleteButton} handleEditButton={handleEditButton} />
                            ))
                        )
                    }
                </tbody>

            </BSTable>
            <TablePagination paginationItems={pageItems} setActivePage={setActivePage} activePage={activePage} itemsPerPage={itemsPerPage} handleChangeItemsPerPage={handleChangeItemsPerPage} />

        </Fragment>
    )
}

export default Table
