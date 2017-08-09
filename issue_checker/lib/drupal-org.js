const request = require('request-promise-native');

const issue_status = {
  1: 'active',
  2: 'fixed',
  3: 'closed (duplicate)',
  4: 'postponed',
  5: 'closed (won\'t fix)',
  6: 'closed (works as designed)',
  7: 'closed (fixed)',
  8: 'needs review',
  13: 'needs work',
  14: 'reviewed & tested by the community',
  15: 'patch (to be ported)',
  16: 'postponed (maintainer needs more info)',
  18: 'closed (cannot reproduce)',
};

const httpOptions = {
  url: 'https://www.drupal.org/api-d7/node.json',
  headers: {
    'Accept': 'application/json'
  },
  json: true,
  transform2xxOnly: true
};

function getNode(node_id, context) {
  "use strict";
  // Allow a context to be passed to the final promise
  if (typeof context === 'undefined') {
    context = {};
  }

  let reqOpts = Object.assign({}, httpOptions, { url: httpOptions.url + "?nid=" + node_id });

  // Add the context to the result, ensuring node is always there.
  reqOpts.transform = (page) => {
    const node = page.list[0];

    // Translate the issue status to a string
    if (typeof node.field_issue_status !== 'undefined') {
      node.field_issue_status = issue_status[node.field_issue_status];
    }

    return Object.assign({}, context, { node: node });
  };

  return request(reqOpts);
}

module.exports = {
  getNode: getNode
};