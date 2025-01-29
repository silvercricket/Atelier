import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import ProductOverview from '../ProductOverview.jsx';


const mockProductDetails = {
  id: 40344,
  name: "Camo Onesie",
  slogan: "Blend in to your crowd",
  description: "The So Fatigues will wake you up and fit you in.",
  category: "Jackets",
  default_price: "140.00",
  features: [
    {
      feature: "Fabric",
      value: "Canvas"
    },
    {
      feature: "Buttons",
      value: "Brass"
    }
  ]
};

const mockProductStyles = {
  product_id: "40344",
  results: [
    {
      style_id: 240500,
      name: "Forest Green & Black",
      original_price: "140.00",
      sale_price: null,
      "default?": true,
      photos: [
        {
          thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        }
      ],
      skus: {
        "1394769": {
          quantity: 8,
          size: "XS"
        },
        "1394770": {
          quantity: 16,
          size: "S"
        }
      }
    }
  ]
};

const initialState = {
  products: {
    productDetails: {
      40344: mockProductDetails
    },
    productStyles: mockProductStyles
  }
};

const mockStore = configureStore([]);

describe('ProductOverview', () => {
  let store;
  let user;

  beforeEach(() => {
    store = mockStore(initialState);
    user = userEvent.setup();
  })

  test('display product name and price', async () => {
    render(
      <Provider store={store}>
        <ProductOverview />
      </Provider>
    );

    expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
    expect(screen.getByText('$140.00')).toBeInTheDocument();
    expect(screen.getByText('Jackets')).toBeInTheDocument();
  });

  test('shows correct style options', () => {
    render(
      <Provider store={store}>
        <ProductOverview />
      </Provider>
    );

    expect(screen.getByText('Forest Green & Black')).toBeInTheDocument();
  });
});

describe('Add to Cart Flow', () => {
  let store;
  let user;

  beforeEach(() => {
    store = mockStore(initialState);
    user = userEvent.setup();
  })

  test('complete add to cart flow works', async () => {
    render(
      <Provider store={store}>
        <ProductOverview />
      </Provider>
    );
    // 1. Load product
    expect(screen.getByText('Camo Onesie')).toBeInTheDocument();

    // 2. Select style
    const styleOption = screen.getByText('Forest Green & Black');
    await user.click(styleOption);

    // 3. Choose size
    const sizeSelector = screen.getByRole('combobox', { name: /size/i });
    await user.selectOptions(sizeSelector, 'XS');

    // 4. Set quantity
    const quantitySelector = screen.getByRole('combobox', { name: /quantity/i });
    await user.selectOptions(quantitySelector, '1');

    // 5. Add to cart
    const addToBagButton = screen.getByText('ADD TO BAG');
    await user.click(addToBagButton);

  });
});