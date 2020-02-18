function getSuccessFunctionality(result) {
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

function getNoResultsFunctionality() {
  return {
    get: () => {
      return Promise.resolve({
        exists: false,
      });
    },
  };
}

function getThrowsFunctionality() {
  return {
    get: () => {
      return Promise.reject({});
    },
  };
}

export default function generateMockFirestore({functionality, result}) {
  let behaviour;

  switch (functionality) {
    case 'getSuccess':
      behaviour = getSuccessFunctionality(result);
      break;

    case 'getNoResults':
      behaviour = getNoResultsFunctionality();
      break;

    case 'getThrows':
      behaviour = getThrowsFunctionality();
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
