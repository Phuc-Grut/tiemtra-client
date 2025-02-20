import***REMOVED***React***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***render,***REMOVED***screen***REMOVED***}***REMOVED***from***REMOVED***'@testing-library/react';
import***REMOVED***App***REMOVED***from***REMOVED***'./App';

test('renders***REMOVED***learn***REMOVED***react***REMOVED***link',***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***render(<App***REMOVED***/>);
***REMOVED******REMOVED***const***REMOVED***linkElement***REMOVED***=***REMOVED***screen.getByText(/learn***REMOVED***react/i);
***REMOVED******REMOVED***expect(linkElement).toBeInTheDocument();
});
