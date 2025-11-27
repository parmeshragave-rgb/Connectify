import { render, screen } from "@testing-library/react";
import SkeletonCard from "../Components/SkeletonCard";

describe("SkeletonCard", () => {
  test("renders four skeletons with default props and correct variants", () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(4);
    const rectangular = container.querySelectorAll('.MuiSkeleton-rectangular');
    const text = container.querySelectorAll('.MuiSkeleton-text');
    expect(rectangular.length).toBe(1);
    expect(text.length).toBe(3);
  });

  test("renders horizontal variant and accepts custom width/height", () => {
    const { container } = render(<SkeletonCard variant="horizontal" width="400px" height={150} />);
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(4);
    const rectangular = container.querySelectorAll('.MuiSkeleton-rectangular');
    expect(rectangular.length).toBe(1);
  });

  test("accepts sx overrides and still shows skeletons", () => {
    const { container } = render(<SkeletonCard sx={{ backgroundColor: 'red' }} />);
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(4);
  });
});
