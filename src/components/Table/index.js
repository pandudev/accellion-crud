import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import { Button, Form, Pagination, Table as BSTable } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSortAlphaDown, faSortAlphaUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss'
import { SortByObjField } from '../../utils/sort';

const TablePagination = ({ paginationItems, setActivePage, activePage }) => {
    const handlePrev = () => activePage > 1 ? setActivePage(activePage - 1) : setActivePage(1);
    const handleNext = () => activePage < paginationItems.length ? setActivePage(activePage + 1) : setActivePage(paginationItems.length);
    const handleFirst = () => setActivePage(1);
    const handleLast = () => setActivePage(paginationItems.length);
    const itemsPerPageArr = [5, 10, 20];

    return (
        <Fragment>
            {/* <Form.Select size="md">
                {
                    itemsPerPageArr.map(i => (
                        <option key={i} value={i}>{i}</option>
                    ))
                }
            </Form.Select> */}
            <Pagination size='md'>
                <Pagination.First disabled={activePage === 1} onClick={handleFirst} />
                <Pagination.Prev disabled={activePage === 1} onClick={handlePrev} />
                {
                    // paginationItems.length > 3 ? (
                    //     paginationItems.map(pg => (
                    //         pg.key >= activePage - 2 ?
                    //         <Pagination.Item key={pg.key} active={pg.active} onClick={() => setActivePage(pg.key)}>{pg.key}</Pagination.Item> : null
                    //     ))
                    // ) :
                    paginationItems.map(pg => (
                        <Pagination.Item key={pg.key} active={pg.active} onClick={() => setActivePage(pg.key)}>{pg.key}</Pagination.Item>
                    ))
                }
                <Pagination.Next disabled={activePage === paginationItems.length} onClick={handleNext} />
                <Pagination.Last disabled={activePage === paginationItems.length} onClick={handleLast} />
            </Pagination>

        </Fragment>
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
        <tr key={data.id} className='tbl-row' onClick={() => handleEditButton(data)}>
            <td className="align-middle">{data.username}</td>
            <td className="align-middle">{data.email}</td>
            <td className="align-middle">{data.score}</td>
            <td className="align-middle">{data.registered}</td>
            <td className="action">
                <Button variant="link" onClick={() => handleEditButton(data)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
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
        setItemsPerPage(5);
        setDisplayedColumns(columns);
        const pages = [];
        for (let index = 1; index <= Math.round(data.length / itemsPerPage); index++) {
            pages.push({
                key: index,
                active: index === activePage
            });
        }

        setPageItems(pages);
        getPageData(data);

        console.log(displayedData);

        return () => data
    }, [isAscending, data, activePage])

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

        // setDisplayedData(data);
    }

    const sortByfield = (field, isNumber) => {
        const sortedData = SortByObjField(data, isAscending, field, isNumber);

        getPageData(sortedData);
    }

    return (
        <Fragment>
            <BSTable responsive striped bordered hover size="sm">
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
            <div className="w-100 d-flex justify-content-end">
                <TablePagination paginationItems={pageItems} setActivePage={setActivePage} activePage={activePage} />

            </div>

        </Fragment>
    )
}

export default Table
