import***REMOVED***{***REMOVED***ReactNode***REMOVED***}***REMOVED***from***REMOVED***"react";

export***REMOVED***interface***REMOVED***IContextMenu<T***REMOVED***=***REMOVED***any>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***label:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***icon?:***REMOVED***ReactNode;
***REMOVED******REMOVED******REMOVED******REMOVED***onClick?:***REMOVED***(item:***REMOVED***T)***REMOVED***=>***REMOVED***void;
***REMOVED******REMOVED******REMOVED******REMOVED***isMulti?:***REMOVED***boolean;***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Dùng***REMOVED***khi***REMOVED***thao***REMOVED***tác***REMOVED***áp***REMOVED***dụng***REMOVED***cho***REMOVED***nhiều***REMOVED***dòng***REMOVED***được***REMOVED***chọn
***REMOVED******REMOVED******REMOVED******REMOVED***children?:***REMOVED***IContextMenu<T>[];***REMOVED***//***REMOVED***Menu***REMOVED***con***REMOVED***(nếu***REMOVED***cần***REMOVED***submenu)
***REMOVED******REMOVED***}