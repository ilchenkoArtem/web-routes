import { ExtendsUrlFromParentConfig } from 'src/nested-routes/types';
import { expectType } from 'tsd';

// Base Route + Base Route
declare const test1: ExtendsUrlFromParentConfig<
  {
    url: '/path';
  },
  {
    url: '/child';
  }
>;
expectType<{
  url: '/path/child';
}>(test1);

// Base Route + Route with params
declare const test2: ExtendsUrlFromParentConfig<
  {
    url: '/path';
  },
  {
    url: '/child/:id';
  }
>;

expectType<{
  url: '/path/child/:id';
}>(test2);

// Base Route + Route with query
declare const test3: ExtendsUrlFromParentConfig<
  {
    url: '/path';
  },
  {
    url: '/child';
    query: {
      id: 'idQuery';
    };
  }
>;

expectType<{
  url: '/path/child';
  query: {
    id: 'idQuery';
  };
}>(test3);

// Base Route + Route with params and query
declare const test4: ExtendsUrlFromParentConfig<
  {
    url: '/path';
  },
  {
    url: '/child/:id';
    query: {
      id: 'idQuery';
    };
  }
>;

expectType<{
  url: '/path/child/:id';
  query: {
    id: 'idQuery';
  };
}>(test4);

// Route with params + Base Route

declare const test5: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
  },
  {
    url: '/child';
  }
>;

expectType<{
  url: '/path/:id/child';
}>(test5);

// Route with params + Route with params
declare const test6: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
  },
  {
    url: '/child/:id2';
  }
>;

expectType<{
  url: '/path/:id/child/:id2';
}>(test6);

// Route with params + Route with a query
declare const test7: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
  },
  {
    url: '/child';
    query: {
      id: 'idQuery';
    };
  }
>;

expectType<{
  url: '/path/:id/child';
  query: {
    id: 'idQuery';
  };
}>(test7);

// Route with params + Route with params and query
declare const test8: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
  },
  {
    url: '/child/:id2';
    query: {
      id: 'idQuery';
    };
  }
>;

expectType<{
  url: '/path/:id/child/:id2';
  query: {
    id: 'idQuery';
  };
}>(test8);

// Route with query + Base Route
declare const test9: ExtendsUrlFromParentConfig<
  {
    url: '/path';
    query: {
      id: 'idQuery';
    };
  },
  {
    url: '/child';
  }
>;

expectType<{
  url: '/path/child';
}>(test9);

// Route with query + Route with params
declare const test10: ExtendsUrlFromParentConfig<
  {
    url: '/path';
    query: {
      id: 'idQuery';
    };
  },
  {
    url: '/child/:id';
  }
>;

expectType<{
  url: '/path/child/:id';
}>(test10);

// Route with query + Route with query
declare const test11: ExtendsUrlFromParentConfig<
  {
    url: '/path';
    query: {
      id: 'idQuery1';
    };
  },
  {
    url: '/child';
    query: {
      id: 'idQuery2';
    };
  }
>;

expectType<{
  url: '/path/child';
  query: {
    id: 'idQuery2';
  };
}>(test11);

// Route with query + Route with params and query
declare const test12: ExtendsUrlFromParentConfig<
  {
    url: '/path';
    query: {
      id: 'idQuery1';
    };
  },
  {
    url: '/child/:id';
    query: {
      id: 'idQuery2';
    };
  }
>;

expectType<{
  url: '/path/child/:id';
  query: {
    id: 'idQuery2';
  };
}>(test12);

// Route with params and query + Base Route
declare const test13: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
    query: {
      id: 'idQuery';
    };
  },
  {
    url: '/child';
  }
>;

expectType<{
  url: '/path/:id/child';
}>(test13);

// Route with params and query + Route with params
declare const test14: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
    query: {
      id: 'idQuery';
    };
  },
  {
    url: '/child/:id2';
  }
>;

expectType<{
  url: '/path/:id/child/:id2';
}>(test14);

// Route with params and query + Route with query
declare const test15: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
    query: {
      id: 'idQuery1';
    };
  },
  {
    url: '/child';
    query: {
      id: 'idQuery2';
    };
  }
>;

expectType<{
  url: '/path/:id/child';
  query: {
    id: 'idQuery2';
  };
}>(test15);

// Route with params and query + Route with params and query
declare const test16: ExtendsUrlFromParentConfig<
  {
    url: '/path/:id';
    query: {
      id: 'idQuery1';
    };
  },
  {
    url: '/child/:id2';
    query: {
      id: 'idQuery2';
    };
  }
>;

expectType<{
  url: '/path/:id/child/:id2';
  query: {
    id: 'idQuery2';
  };
}>(test16);

// Base Route and children + Base Route
declare const test17: ExtendsUrlFromParentConfig<
  {
    url: '/path';
    children: {
      child: {
        url: '/child';
      };
    };
  },
  {
    url: '/path2';
  }
>;
expectType<{
  url: '/path/path2';
}>(test17);

// Base Route and children + Base Route and children
declare const test18: ExtendsUrlFromParentConfig<
  {
    url: '/path';
    children: {
      child: {
        url: '/child';
      };
    };
  },
  {
    url: '/path2';
    children: {
      child: {
        url: '/child2';
      };
    };
  }
>;

expectType<{
  url: '/path/path2';
  children: {
    child: {
      url: '/child2';
    };
  };
}>(test18);

// Base Route + Route with children
declare const test19: ExtendsUrlFromParentConfig<
  {
    url: '/path';
  },
  {
    url: '/child';
    children: {
      child: {
        url: '/child2';
      };
    };
  }
>;

expectType<{
  url: '/path/child';
  children: {
    child: {
      url: '/child2';
    };
  };
}>(test19);
