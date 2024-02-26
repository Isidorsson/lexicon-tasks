import '../styles/Channel.css';

import { useEffect, useState } from 'react';

import { fetchData } from '../api/fetchData';

interface LiveAudio {
  id: string;
  url: string;
  statkey: string;
}

interface Channel {
  id: string;
  name: string;
  image: string;
  color: string;
  tagline: string;
  siteurl: string;
  liveaudio: LiveAudio;
  scheduleurl: string;
  channeltype: string;
  xmltvid: string;
}
export const Channel: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, isLoading, error } = await fetchData('channels');

      if (data) {
        const channelNodes = data.getElementsByTagName('channel');
        const parsedChannels = Array.from(channelNodes).map((channelNode) => {
          return {
            id: channelNode.getAttribute('id') || '',
            name: channelNode.getElementsByTagName('name')[0]?.textContent || '',
            image: channelNode.getElementsByTagName('image')[0]?.textContent || '',
            color: channelNode.getElementsByTagName('color')[0]?.textContent || '',
            tagline: channelNode.getElementsByTagName('tagline')[0]?.textContent || '',
            siteurl: channelNode.getElementsByTagName('siteurl')[0]?.textContent || '',
            liveaudio: {
              id: channelNode.getElementsByTagName('liveaudio')[0]?.getAttribute('id') || '',
              url: channelNode.getElementsByTagName('url')[0]?.textContent || '',
              statkey: channelNode.getElementsByTagName('statkey')[0]?.textContent || '',
            },
            scheduleurl: channelNode.getElementsByTagName('scheduleurl')[0]?.textContent || '',
            channeltype: channelNode.getElementsByTagName('channeltype')[0]?.textContent || '',
            xmltvid: channelNode.getElementsByTagName('xmltvid')[0]?.textContent || '',
          };
        });
        setChannels(parsedChannels);
      } else {
        setError('No channels found');
      }

      setIsLoading(isLoading);
      if (error) {
        setError(error);
      }
    };

    fetchChannels();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="channel">
      {channels.map((channel: Channel) => (
        <div key={channel.id}>
          <h2>{channel.name}</h2>
          <img src={channel.image} alt={channel.name} />
          <p style={{ color: `#${channel.color}` }}>{channel.tagline}</p>
          <a href={channel.siteurl}>Visit Site</a>
          <div>
            <h3>Live Audio</h3>
            <audio controls src={channel.liveaudio.url}>
              Your browser does not support the audio element.
            </audio>
          </div>
          <a href={channel.scheduleurl}>Schedule</a>
          <p>{channel.channeltype}</p>
          <p>{channel.xmltvid}</p>
        </div>
      ))}
    </div>
  );
}