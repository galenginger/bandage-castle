// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SpeciesListPage from './SpeciesListPage'

const species = [
  { id: 1, name: 'Dragon', slug: 'dragon', diet: 'Carnivore', dangerLevel: 4, residentCount: 2, incompatibleWith: [] },
  { id: 2, name: 'Troll', slug: 'troll', diet: 'Herbivore', dangerLevel: 2, residentCount: 1, incompatibleWith: [] },
]

vi.mock('../../hooks/useApi', () => ({
  useApi: () => ({ data: species, loading: false, error: null, reload: () => {} }),
}))

afterEach(cleanup)

function searchFor(text: string) {
  render(
    <MemoryRouter>
      <SpeciesListPage />
    </MemoryRouter>,
  )
  fireEvent.change(screen.getByPlaceholderText('Search species...'), { target: { value: text } })
}

describe('species search (#7)', () => {
  it('finds Dragon when the keeper types dragon', () => {
    searchFor('dragon')
    expect(screen.queryByText('Dragon')).not.toBeNull()
    expect(screen.queryByText('Troll')).toBeNull()
  })

  it('finds by diet in lower case too', () => {
    searchFor('herbivore')
    expect(screen.queryByText('Troll')).not.toBeNull()
    expect(screen.queryByText('Dragon')).toBeNull()
  })
})
