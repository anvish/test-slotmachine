import React from 'react';

const Prize = (props: { prize: number | undefined }) => {
    const { prize } = props;
    if (prize === undefined) return <span>&nbsp;</span>;
    if (prize === 0) return <span>Try again</span>;
    return <span>Prize: ${prize}</span>;
}

export default Prize;
