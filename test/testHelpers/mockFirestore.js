function getSuccess(result) {
  return {
    get: () => {
      return Promise.resolve({
        exists: true,
        data: () => {
          return result;
        },
      });
    },
  };
}

function getNoResults() {
  return {
    get: () => {
      return Promise.resolve({
        exists: false,
      });
    },
  };
}

function getThrows() {
  return {
    get: () => {
      return Promise.reject({});
    },
  };
}

function postSuccessfully() {
  return {
    get: () => {
      return Promise.resolve({
        exists: false,
        data: () => {
        },
      });
    },
    set: () => {
      return Promise.resolve();
    },
  };
}

function postThrows() {
  return {
    get: () => {
      return Promise.resolve({
        exists: false,
      });
    },
    set: () => {
      return Promise.reject({});
    },
  };
}

function removeSchema() {
  return {
    delete: () => {
      return Promise.resolve();
    },
  };
}

export default function generateMockFirestore({functionality, result}) {
  let behaviour;

  switch (functionality) {
    case 'getSuccess':
      behaviour = getSuccess(result);
      break;

    case 'getNoResults':
      behaviour = getNoResults();
      break;

    case 'getThrows':
      behaviour = getThrows();
      break;

    case 'postSuccessfully':
      behaviour = postSuccessfully();
      break;

    case 'postThrows':
      behaviour = postThrows();
      break;

    case 'removeSchema':
      behaviour = removeSchema();
      break;

    default:
      // no default
  }

  return {
    collection: () => {
      return {
        doc: () => {
          return behaviour;
        },
      };
    },
  };
}
