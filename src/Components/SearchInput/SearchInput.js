import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { IoIosSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({}))

const SearchInput = props => {
  const classes = useStyles()
  const { text = '', onChange = () => {} } = props

  return (
    <Paper>
      <IconButton aria-label='search'>
        <IoIosSearch />
      </IconButton>
      <InputBase
        value={text}
        onChange={onChange}
        placeholder='Search Note'
        inputProps={{ 'aria-label': 'search on note keeper' }}
      />
    </Paper>
  )
}

export default SearchInput
