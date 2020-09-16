import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { IoIosStar, IoIosArchive, IoIosClose } from 'react-icons/io'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ColorPicker from '../ColorPicker/ColorPicker'
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import actions from '../../Redux/action'

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px'
  },
  root: {
    width: '400px',
    padding: '0 10px'
  },
  title: {
    marginBottom: 0
  },
  formContainer: {
    paddingBottom: '20px'
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const AddNote = props => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    id = '',
    newNote = false,
    titleProps = '',
    descriptionProps = '',
    pinnedProps = '',
    archivedProps = '',
    bgColorProps = '#FFFFFF',
    colorTextProps = '#353232',
    activeProps = false
  } = props
  const [active, setActive] = React.useState(activeProps)
  const [openSnackBar, setOpenSnackBar] = React.useState(false)
  const [title, setTitle] = React.useState(titleProps)
  const [titleError, setTitleError] = React.useState(false)
  const [description, setDescription] = React.useState(descriptionProps)
  const [pinned, setPinned] = React.useState(pinnedProps)
  const [archived, setArchived] = React.useState(archivedProps)
  const [bgColor, setBGColor] = React.useState({
    hex: bgColorProps,
    hsl: { a: 1 }
  })
  const [colorText, setColorText] = React.useState({
    hex: colorTextProps,
    hsl: { a: 1 }
  })

  const handleOnClick = () => {
    if (!active) {
      setActive(true)
    }
  }

  const handleOnChangeColor = bgColor => {
    setBGColor(bgColor)
  }

  const handleOnChangeColorText = color => {
    setColorText(color)
  }

  const handleOnClose = () => {
    if (!newNote) {
      dispatch(
        actions.changeNote({
          id,
          active: false,
          title,
          description,
          bgColor: bgColor.hex,
          colorText,
          pinned,
          archived
        })
      )
    }
    setActive(false)
  }

  const handleOnSave = () => {
    if (!title) {
      return setTitleError(true)
    }
    if (newNote) {
      dispatch(
        actions.addNote({
          active,
          title,
          description,
          bgColor: bgColor.hex,
          colorText,
          pinned,
          archived
        })
      )
      setBGColor({
        hex: bgColorProps,
        hsl: { a: 1 }
      })
      setColorText({
        hex: colorTextProps,
        hsl: { a: 1 }
      })
      setTitle('')
      setDescription('')
      setTitleError(false)
      setActive(false)
    } else {
      dispatch(
        actions.changeNote({
          id,
          active,
          title,
          description,
          bgColor: bgColor.hex,
          colorText,
          pinned,
          archived
        })
      )
    }
    setOpenSnackBar(true)
  }

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false)
  }

  return (
    <Paper className={classes.root} style={{ backgroundColor: bgColor.hex }}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message='Note saved!'
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleCloseSnackBar}
            >
              <IoIosClose />
            </IconButton>
          </React.Fragment>
        }
      />
      <div className={classes.header} onClick={handleOnClick}>
        {!active && (
          <Typography
            className={classes.title}
            style={{ color: colorText.hex }}
            color='textSecondary'
            gutterBottom
          >
            {title ? title : 'Add Note'}
          </Typography>
        )}
        {active && (
          <React.Fragment>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <IconButton
                aria-label='search'
                onClick={() => setPinned(!pinned)}
              >
                <IoIosStar style={pinned ? { color: '#DCC92C' } : {}} />
              </IconButton>
              <ColorPicker
                bgColor='grey'
                color={bgColor.hsl}
                onChangeColorPicker={handleOnChangeColor}
              />
              <ColorPicker
                bgColor='grey'
                letter
                color={colorText.hsl}
                onChangeColorPicker={handleOnChangeColorText}
              />
              {!newNote && (
                <IconButton
                  aria-label='archived'
                  onClick={() => setArchived(!archived)}
                >
                  <IoIosArchive style={archived ? { color: '#DCC92C' } : {}} />
                </IconButton>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
      {active && (
        <div className={classes.formContainer}>
          <TextField
            id='standard-full-width'
            error={titleError}
            label='Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ display: 'flex', color: colorText.hex }}
            helperText='Enter title of your note.'
            InputLabelProps={{
              shrink: true,
              style: { color: colorText.hex }
            }}
          />
          <TextField
            id='filled-multiline-static'
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ marginTop: 20, display: 'flex' }}
            label='Description'
            multiline
            helperText='Enter description of your note.'
            rows={4}
            InputLabelProps={{
              shrink: true,
              style: { color: colorText.hex }
            }}
          />
          <div className={classes.footerContainer}>
            <Button
              variant='contained'
              color='primary'
              style={{ marginRight: '10px' }}
              onClick={handleOnSave}
            >
              Save
            </Button>
            <Button onClick={handleOnClose}>Close</Button>
          </div>
        </div>
      )}
    </Paper>
  )
}

export default AddNote
