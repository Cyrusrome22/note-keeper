import React from 'react'
import AppBar from '../../Components/AppBar/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Note from '../../Components/Note/Note'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  container: {
    minHeight: '100vh',
    width: '100%'
  },
  noteContainer: {
    paddingTop: '80px',
    display: 'flex',
    justifyContent: 'center'
  },
  notesContainer: {
    padding: '20px 50px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}))

const Home = props => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const pageState = useSelector(state => state.pageState)
  const notesState = useSelector(state => state.notesState)

  return (
    <React.Fragment>
      <AppBar />
      <div
        className={classes.container}
        style={{
          backgroundColor: pageState.backgroundColor.hex,
          opacity: pageState.backgroundColor.hsl.a
        }}
      >
        <div className={classes.noteContainer}>
          <Note newNote />
        </div>
        <div className={classes.notesContainer}>
          {notesState.newState.map((note, index) => {
            return (
              <div style={{ margin: '10px' }} key={`${index}-${note.id}`}>
                <Note
                  id={note.id}
                  activeProps={note.active}
                  titleProps={note.title}
                  descriptionProps={note.description}
                  pinnedProps={note.pinned}
                  archivedProps={note.archived}
                  bgColorProps={note.bgColor}
                  colorTextProps={note.colorText}
                />
              </div>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
