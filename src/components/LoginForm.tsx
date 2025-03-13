import***REMOVED***React,***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***"react";
import***REMOVED***{***REMOVED***TextField,***REMOVED***Button,***REMOVED***Container,***REMOVED***Typography,***REMOVED***Box***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";
import***REMOVED***{***REMOVED***login***REMOVED***}***REMOVED***from***REMOVED***"../services/Authencation/authService";

export***REMOVED***default***REMOVED***function***REMOVED***LoginForm()***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[email,***REMOVED***setEmail]***REMOVED***=***REMOVED***useState("");
***REMOVED******REMOVED***const***REMOVED***[password,***REMOVED***setPassword]***REMOVED***=***REMOVED***useState("");
***REMOVED******REMOVED***const***REMOVED***[error,***REMOVED***setError]***REMOVED***=***REMOVED***useState("");***REMOVED***

***REMOVED******REMOVED***const***REMOVED***handleSubmit***REMOVED***=***REMOVED***async***REMOVED***(event:***REMOVED***React.FormEvent)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***event.preventDefault();
***REMOVED******REMOVED******REMOVED******REMOVED***setError("");***REMOVED***//***REMOVED***Xóa***REMOVED***lỗi***REMOVED***trước***REMOVED***khi***REMOVED***gửi***REMOVED***API
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("Email:",***REMOVED***email,***REMOVED***"Password:",***REMOVED***password);

***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***userData***REMOVED***=***REMOVED***await***REMOVED***login(email,***REMOVED***password);***REMOVED***//***REMOVED***✅***REMOVED***Gọi***REMOVED***API***REMOVED***đăng***REMOVED***nhập
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("Đăng***REMOVED***nhập***REMOVED***thành***REMOVED***công:",***REMOVED***userData);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***window.location.href***REMOVED***=***REMOVED***"/dashboard";***REMOVED***//***REMOVED***✅***REMOVED***Chuyển***REMOVED***hướng***REMOVED***sau***REMOVED***khi***REMOVED***đăng***REMOVED***nhập***REMOVED***thành***REMOVED***công
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error:***REMOVED***any)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(error.response?.data?.message***REMOVED***||***REMOVED***"Đăng***REMOVED***nhập***REMOVED***thất***REMOVED***bại");
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Container***REMOVED***maxWidth="xs">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Box
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***display:***REMOVED***"flex",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***flexDirection:***REMOVED***"column",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***alignItems:***REMOVED***"center",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mt:***REMOVED***8,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***p:***REMOVED***3,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***borderRadius:***REMOVED***2,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***boxShadow:***REMOVED***3,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***bgcolor:***REMOVED***"background.paper",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Typography***REMOVED***variant="h5"***REMOVED***gutterBottom>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Đăng***REMOVED***nhập***REMOVED***tài***REMOVED***khoản***REMOVED***của***REMOVED***bạn
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Typography>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{error***REMOVED***&&***REMOVED***<Typography***REMOVED***color="error">{error}</Typography>}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<form***REMOVED***onSubmit={handleSubmit}***REMOVED***style={{***REMOVED***width:***REMOVED***"100%"***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TextField
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***label="Email"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="email"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fullWidth
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***margin="normal"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant="outlined"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value={email}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onChange={(e)***REMOVED***=>***REMOVED***setEmail(e.target.value)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TextField
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***label="Mật***REMOVED***khẩu"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="password"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fullWidth
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***margin="normal"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant="outlined"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value={password}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onChange={(e)***REMOVED***=>***REMOVED***setPassword(e.target.value)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="submit"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fullWidth
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant="contained"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***color="primary"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx={{***REMOVED***mt:***REMOVED***2***REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Đăng***REMOVED***nhập
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</form>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED******REMOVED******REMOVED***</Container>
***REMOVED******REMOVED***);
}
