const React = require('react');

const Breadcrumb = ({
  crumb
}) => typeof crumb === 'string'
  ? <li>{crumb}</li>
  : <li>
    <a href={crumb.href}>{crumb.label}</a>
  </li>;

const renderNull = crumbs => !crumbs || !crumbs.length || !Array.isArray(crumbs);

const Breadcrumbs = ({
  crumbs
}) => {
  if (renderNull(crumbs)) {
    return null;
  }
  return <div className="breadcrumb">
    <ol>
      {
        crumbs.map((crumb, index) =>
          <Breadcrumb key={index} crumb={crumb} />
        )
      }
    </ol>
  </div>;
};

module.exports = Breadcrumbs;
