import React from "react";
// boostrap pagination
import { Pagination } from "react-bootstrap";
// for links to next page
import { LinkContainer } from "react-router-bootstrap";
// will need several props set admin and keyword defaults
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  // only return if pages are greater than 1
  return (
    pages > 1 && (
      <Pagination>
        {/* map through whatever the number of pages is if it is a keyword search use keyword route
        else use the page route  */}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${(x = 1)}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
