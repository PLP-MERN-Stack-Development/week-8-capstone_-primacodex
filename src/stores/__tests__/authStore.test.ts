import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should have initial state', () => {
    const { user, isAuthenticated, isLoading } = useAuthStore.getState();
    
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(isLoading).toBe(false);
  });

  it('should login user', async () => {
    const { login } = useAuthStore.getState();
    
    await login('test@example.com', 'password');
    
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeDefined();
    expect(user?.email).toBe('test@example.com');
    expect(isAuthenticated).toBe(true);
  });

  it('should logout user', () => {
    const { logout } = useAuthStore.getState();
    
    logout();
    
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});