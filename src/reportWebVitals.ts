import***REMOVED***{***REMOVED***ReportHandler***REMOVED***}***REMOVED***from***REMOVED***'web-vitals';

const***REMOVED***reportWebVitals***REMOVED***=***REMOVED***(onPerfEntry?:***REMOVED***ReportHandler)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***if***REMOVED***(onPerfEntry***REMOVED***&&***REMOVED***onPerfEntry***REMOVED***instanceof***REMOVED***Function)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***import('web-vitals').then(({***REMOVED***getCLS,***REMOVED***getFID,***REMOVED***getFCP,***REMOVED***getLCP,***REMOVED***getTTFB***REMOVED***})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***getCLS(onPerfEntry);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***getFID(onPerfEntry);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***getFCP(onPerfEntry);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***getLCP(onPerfEntry);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***getTTFB(onPerfEntry);
***REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED***}
};

export***REMOVED***default***REMOVED***reportWebVitals;
