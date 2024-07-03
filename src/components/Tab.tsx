import React, { useState } from 'react'
import './styles/Tabs.css'

type TabProps = {
  children: React.ReactNode
  onClick?: (index: number) => void
}

type TabsProps = {
  children: React.ReactNode
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='tabs'>
      <div className='tab-buttons container-center'>
        {React.Children.map(children, (child, index) => (
          <button
            className={`tab-button ${index === activeTab ? 'active' : ''}`}
            onClick={() => {
              handleTabClick(index)
              child.props.onClick && child.props.onClick()
            }}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className='tab-panels'>
        {React.Children.map(children, (child, index) =>
          index === activeTab ? <div className='tab-panel'>{child}</div> : null,
        )}
      </div>
    </div>
  )
}

export const Tab = ({ children }: TabProps) => {
  return <>{children}</>
}
