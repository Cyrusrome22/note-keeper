import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ColorPicker from '../ColorPicker/ColorPicker'
import { useSelector, useDispatch } from 'react-redux'
import SearchInput from '../SearchInput/SearchInput'
import actions from '../../Redux/action'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1
  },
  title: {
    marginRight: '1rem'
  }
}))

const WhiteCheckbox = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: 'white'
    }
  },
  checked: {}
})(props => <Checkbox color='default' {...props} />)

const NavBar = props => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const pageState = useSelector(state => state.pageState)
  const [text, setText] = React.useState('')
  const [pinned, setPinned] = React.useState(false)
  const [archived, setArchived] = React.useState(false)

  React.useEffect(() => {
    dispatch(actions.setSearchText({ text, pinned, archived }))
  }, [text, pinned, archived])

  const onChangeColorPicker = (color, event) => {
    dispatch(actions.setBackgroundColor(color))
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <div className={classes.titleSection}>
            <Typography variant='h6' className={classes.title}>
              Note Keeper
            </Typography>
            <SearchInput text={text} onChange={e => setText(e.target.value)} />
            <FormGroup row style={{ marginLeft: '20px' }}>
              <FormControlLabel
                control={
                  <WhiteCheckbox
                    color='default'
                    checked={pinned}
                    onChange={() => setPinned(!pinned)}
                  />
                }
                label='Pinned'
              />
              <FormControlLabel
                control={
                  <WhiteCheckbox
                    checked={archived}
                    onChange={() => setArchived(!archived)}
                  />
                }
                label='Archived'
              />
            </FormGroup>
          </div>
          <ColorPicker
            color={pageState.backgroundColor.hsl}
            onChangeColorPicker={onChangeColorPicker}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
