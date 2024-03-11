import { makeInstaller } from '@htht/utils'
import installs from './installs'

export * from './components'

export default makeInstaller([...installs])
