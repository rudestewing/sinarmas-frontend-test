import {Fragment, useContext} from 'react'
import Link from 'next/link'
import FavouritesContext from '../contexts/FavouritesContext'

const SiteLayout = (props) => {
  const {total} = useContext(FavouritesContext.Context)

  return (
    <Fragment>
      <header className="w-full h-16 flex justify-between items-center px-5 fixed z-30 bg-gray-900">
        <Link href="/">
          <a className="inline-block text-gray-100 text-lg tracking-wider font-bold">
            Sinarmas MovieDB
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/my-favourite">
              <a className="inline-block text-gray-100 text-md tracking-wider">
                My Favourites ({total})
              </a>
            </Link>
          </li>
        </ul>
      </header>
      <div className="pb-10 pt-16">
        {props.children}
      </div>
    </Fragment>
  )
}

export default SiteLayout
