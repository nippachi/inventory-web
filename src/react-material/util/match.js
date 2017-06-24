module.exports = ({
    location,
    locationDescriptor
}) => {
    let {
        pathname = "",
        query = {}
    } = typeof(locationDescriptor) == "object" ? locationDescriptor
      :                                          {pathname: locationDescriptor};

    return (
        pathname == location.pathname
     && Object.keys(query).every(i => query[i] == location.query[i])
    )
};
