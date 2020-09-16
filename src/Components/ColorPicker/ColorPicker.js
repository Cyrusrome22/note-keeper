import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { ChromePicker } from 'react-color'
import { IoIosColorPalette, IoIosCloseCircle } from 'react-icons/io'
import { SiLetterboxd } from 'react-icons/si'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative'
  },
  iconButton: {
    color: 'white'
  },
  colorPickerContainer: {
    position: 'absolute',
    right: 0,
    zIndex: '2'
  }
}))

const ColorPicker = props => {
  const classes = useStyles()
  const { letter = false, bgColor = '', color, onChangeColorPicker } = props

  const [openColorPicker, setOpenColorPicker] = React.useState(false)

  const handleIconButton = () => {
    if (!openColorPicker) {
      setOpenColorPicker(true)
    } else {
      setOpenColorPicker(false)
    }
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <IconButton
          className={classes.iconButton}
          variant='contained'
          component='span'
          onClick={handleIconButton}
        >
          {openColorPicker ? (
            <IoIosCloseCircle style={bgColor ? { color: bgColor } : {}} />
          ) : (
            <React.Fragment>
              {letter ? (
                <SiLetterboxd style={bgColor ? { color: bgColor } : {}} />
              ) : (
                <IoIosColorPalette style={bgColor ? { color: bgColor } : {}} />
              )}
            </React.Fragment>
          )}
        </IconButton>
        {openColorPicker && (
          <div className={classes.colorPickerContainer}>
            <ChromePicker color={color} onChange={onChangeColorPicker} />
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default ColorPicker
