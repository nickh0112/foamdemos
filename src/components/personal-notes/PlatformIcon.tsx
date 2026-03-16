import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6'

interface Props {
  platform: 'ig' | 'tt' | 'yt'
  size?: number
}

export default function PlatformIcon({ platform, size = 14 }: Props) {
  switch (platform) {
    case 'ig':
      return <FaInstagram size={size} color="#E4405F" />
    case 'tt':
      return <FaTiktok size={size} color="#69C9D0" />
    case 'yt':
      return <FaYoutube size={size} color="#FF0000" />
  }
}
