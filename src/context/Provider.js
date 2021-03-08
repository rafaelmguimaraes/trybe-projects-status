import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider(props) {
  const [propsState] = useState(props);
  const [analyzedPulls, setAnalyzedPulls] = useState({});
  const [analyzing, setAnalyzing] = useState(false);

  const contextValue = {
    analyzedPulls,
    setAnalyzedPulls,
    analyzing,
    setAnalyzing,
  };

  // useEffect(() => setPropsState(props), [props]);

  return (
    <AppContext.Provider value={ contextValue }>
      {propsState.children}
    </AppContext.Provider>
  );
}

export default Provider;
