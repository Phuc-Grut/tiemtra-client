import***REMOVED***{***REMOVED***ContextMenuItems***REMOVED***}***REMOVED***from***REMOVED***"src/domain/constants/ContextMenuItems";
import***REMOVED***{***REMOVED***IContextMenu***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/IContextMenu";

const***REMOVED***desiredOrder***REMOVED***=***REMOVED***["VIEW",***REMOVED***"LIST_PRODUCT",***REMOVED***"EDIT",***REMOVED***"DELETE"];

export***REMOVED***const***REMOVED***categoryContextMenuItems:***REMOVED***IContextMenu[]***REMOVED***=***REMOVED***desiredOrder
***REMOVED******REMOVED***.map((id)***REMOVED***=>***REMOVED***ContextMenuItems.find((item)***REMOVED***=>***REMOVED***item.id***REMOVED***===***REMOVED***id))
***REMOVED******REMOVED***.filter(Boolean)***REMOVED***as***REMOVED***IContextMenu[];
