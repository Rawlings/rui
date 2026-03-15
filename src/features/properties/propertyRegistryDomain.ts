import { getDefaultPropertyPipeline } from '../../utils/propertyPipeline'
import {
  getPropertyRegistry,
  groupProperties,
  type PropertyDefinition,
} from '../../utils/propertyRegistry'

export type { PropertyDefinition }

export function getGroupedPropertyDefinitions(
  search: string
): Array<[string, PropertyDefinition[]]> {
  const resolvedPipeline = getDefaultPropertyPipeline()
  const base = getPropertyRegistry(resolvedPipeline)
  const query = search.trim().toLowerCase()
  const filtered = query
    ? base.filter((property) =>
        property.name.toLowerCase().includes(query) ||
        property.cssProperty.toLowerCase().includes(query) ||
        property.group.toLowerCase().includes(query)
      )
    : base

  return Object.entries(groupProperties(filtered)) as Array<[string, PropertyDefinition[]]>
}
