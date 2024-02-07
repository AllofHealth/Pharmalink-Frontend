import React from "react"

export const getChildId = (children: React.ReactElement) => {
  const child = React.Children.only(children)
  if ("id" in child?.props) {
    return child.props.id
  }
}
