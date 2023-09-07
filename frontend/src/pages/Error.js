import React from 'react'

function Error() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    > 
      <Container maxWidth="sx" sx={{ mt: 20, mb: 4 }}>
        <Typography variant='h3' textAlign={'center'}>
          Ошибка {}
        </Typography>
      </Container>
    </Box>
  )
}

export default Error